function startPortalSky() {
  const canvas = document.getElementById('portal-canvas');
  if (!canvas || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const gl = canvas.getContext('webgl', { depth: false, antialias: true });
  if (!gl) return;

  const vertexSource = `
    attribute vec3 position;
    attribute vec4 color;
    uniform vec3 rotation;
    uniform vec3 camera;
    uniform vec2 projection;
    uniform float pointScale;
    varying vec4 tint;

    vec3 rotate(vec3 p) {
      vec3 c = cos(rotation);
      vec3 s = sin(rotation);
      p.xy = mat2(c.z, s.z, -s.z, c.z) * p.xy;
      p.xz = mat2(c.y, -s.y, s.y, c.y) * p.xz;
      p.yz = mat2(c.x, s.x, -s.x, c.x) * p.yz;
      return p;
    }

    void main() {
      vec3 back = normalize(camera);
      vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), back));
      vec3 up = cross(back, right);
      vec3 relative = rotate(position) - camera;
      float depth = -dot(relative, back);
      // Perspective projection with near/far planes at 0.1 and 1000.
      gl_Position = vec4(dot(relative, right) * projection.x, dot(relative, up) * projection.y,
                         depth * 1.0002 - 0.20002, depth);
      gl_PointSize = max(1.0, pointScale / max(0.1, depth));
      tint = color;
    }
  `;
  const fragmentSource = `
    precision mediump float;
    varying vec4 tint;

    void main() {
      gl_FragColor = tint;
    }
  `;

  const program = gl.createProgram();
  for (const [type, source] of [[gl.VERTEX_SHADER, vertexSource], [gl.FRAGMENT_SHADER, fragmentSource]]) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    gl.attachShader(program, shader);
    gl.deleteShader(shader);
  }
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return;
  }
  gl.useProgram(program);

  function buffer(target, data) {
    const handle = gl.createBuffer();
    gl.bindBuffer(target, handle);
    gl.bufferData(target, data, gl.STATIC_DRAW);
    return handle;
  }

  const starCount = 5000;
  const starPositions = new Float32Array(starCount * 3);
  const starColors = new Uint8Array(starCount * 4);
  const palette = [[168, 84, 247, 204], [237, 71, 153, 204], [59, 130, 245, 204]];
  for (let i = 0; i < starCount; i++) {
    starPositions[i * 3] = (Math.random() - 0.5) * 100;
    starPositions[i * 3 + 1] = (Math.random() - 0.5) * 100;
    starPositions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    starColors.set(palette[Math.floor(Math.random() * palette.length)], i * 4);
  }
  const starBuffer = buffer(gl.ARRAY_BUFFER, starPositions);
  const starColorBuffer = buffer(gl.ARRAY_BUFFER, starColors);

  const sides = 16;
  const segments = 100;
  const ringIndices = new Uint16Array(sides * segments * 6);
  for (let segment = 0; segment < segments; segment++) {
    for (let side = 0; side < sides; side++) {
      const current = segment * sides + side;
      const along = ((segment + 1) % segments) * sides + side;
      const across = segment * sides + (side + 1) % sides;
      ringIndices.set([current, along, current, across, along, across], current * 6);
    }
  }
  buffer(gl.ELEMENT_ARRAY_BUFFER, ringIndices);

  function ringBuffer(radius, tube) {
    const points = new Float32Array(segments * sides * 3);
    for (let segment = 0; segment < segments; segment++) {
      const angle = segment / segments * Math.PI * 2;
      for (let side = 0; side < sides; side++) {
        const crossSection = side / sides * Math.PI * 2;
        const distance = radius + tube * Math.cos(crossSection);
        const offset = (segment * sides + side) * 3;
        points[offset] = distance * Math.cos(angle);
        points[offset + 1] = distance * Math.sin(angle);
        points[offset + 2] = tube * Math.sin(crossSection);
      }
    }
    return buffer(gl.ARRAY_BUFFER, points);
  }

  const innerRing = ringBuffer(10, 3);
  const outerRing = ringBuffer(15, 2);
  const position = gl.getAttribLocation(program, 'position');
  const color = gl.getAttribLocation(program, 'color');
  const rotation = gl.getUniformLocation(program, 'rotation');
  const camera = gl.getUniformLocation(program, 'camera');
  const projection = gl.getUniformLocation(program, 'projection');
  const pointScale = gl.getUniformLocation(program, 'pointScale');
  const focalLength = 1 / Math.tan(75 * Math.PI / 360);
  let mouseX = 0;
  let mouseY = 0;
  let elapsed = 0;
  let previousFrame;
  let frame;

  function resize() {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.max(1, Math.floor(window.innerWidth * pixelRatio));
    canvas.height = Math.max(1, Math.floor(window.innerHeight * pixelRatio));
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(projection, focalLength * canvas.height / canvas.width, focalLength);
    gl.uniform1f(pointScale, canvas.height * 0.075);
  }

  function move(event) {
    mouseX = (event.clientX / window.innerWidth * 2 - 1) * 2;
    mouseY = (1 - event.clientY / window.innerHeight * 2) * 2;
  }

  function bindPositions(handle) {
    gl.bindBuffer(gl.ARRAY_BUFFER, handle);
    gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 0, 0);
  }

  function draw(now) {
    // Don't jump forward when the page becomes visible again.
    elapsed += previousFrame === undefined ? 1 / 60 : Math.min((now - previousFrame) / 1000, 1 / 30);
    previousFrame = now;
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform3f(camera, mouseX, mouseY, 5);

    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    bindPositions(starBuffer);
    gl.enableVertexAttribArray(color);
    gl.bindBuffer(gl.ARRAY_BUFFER, starColorBuffer);
    gl.vertexAttribPointer(color, 4, gl.UNSIGNED_BYTE, true, 0, 0);
    gl.uniform3f(rotation, Math.sin(elapsed * 0.06) * 0.1, elapsed * 0.018, 0);
    gl.drawArrays(gl.POINTS, 0, starCount);

    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.disableVertexAttribArray(color);
    bindPositions(innerRing);
    gl.vertexAttrib4f(color, 0.66, 0.33, 0.97, 0.3);
    gl.uniform3f(rotation, elapsed * 0.6, elapsed * 0.3, elapsed * 0.18);
    gl.drawElements(gl.LINES, ringIndices.length, gl.UNSIGNED_SHORT, 0);
    bindPositions(outerRing);
    gl.vertexAttrib4f(color, 0.93, 0.28, 0.6, 0.2);
    gl.uniform3f(rotation, Math.PI / 4 + elapsed * 0.3, elapsed * 0.6, elapsed * 0.12);
    gl.drawElements(gl.LINES, ringIndices.length, gl.UNSIGNED_SHORT, 0);

    frame = requestAnimationFrame(draw);
  }

  const sky = canvas.parentElement;
  canvas.addEventListener('webglcontextlost', () => {
    cancelAnimationFrame(frame);
    window.removeEventListener('resize', resize);
    window.removeEventListener('mousemove', move);
    sky.classList.remove('is-rendered');
  });
  gl.enable(gl.BLEND);
  gl.enableVertexAttribArray(position);
  resize();
  // The title and entries have already been parsed. Draw before they are painted.
  draw(performance.now());
  if (gl.isContextLost()) return;
  sky.classList.add('is-rendered');
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', move, { passive: true });
}
