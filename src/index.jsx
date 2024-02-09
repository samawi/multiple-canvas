import React from "react";
import useRefs from "react-use-refs";
import { render } from "react-dom";
import * as DREI from "@react-three/drei";
import * as FIBER from "@react-three/fiber";
import * as THREE from "three";

const Cam = DREI.PerspectiveCamera;

function App(props) {
  const [$0, $1, $2] = useRefs(null);
  return (
    <div {...props}>
      <canvas ref={$0} />
      <canvas ref={$1} />
      <canvas ref={$2} />
      <FIBER.Canvas style={{ gridRow: 1, gridColumn: 2 }}>
        <ViewPort $={$0} position-y={10} />
        <ViewPort $={$1} position-z={10} />
        <ViewPort $={$2} position-x={10} />
        <Cam makeDefault position={[20, 20, 20]} />
        <DREI.Box scale={5} wireframe>
          <meshStandardMaterial wireframe color="hotpink" />
        </DREI.Box>
        <ambientLight />
        <pointLight />
        <axesHelper scale={10} position={[0.01, 0.01, 0.01]} />
        <color attach="background" args={["#212121"]} />
        <DREI.OrbitControls enablePan={false} rotateSpeed={0.2} />
      </FIBER.Canvas>
    </div>
  );
}

const v0 = new THREE.Vector3();

function ViewPort(props) {
  const { $, ...other } = props;
  const { gl, scene, camera, viewport } = FIBER.useThree();
  const ref = React.useRef(null);
  DREI.useHelper(ref, THREE.CameraHelper);
  FIBER.useFrame(() => {
    ref.current.lookAt(v0);
    gl.autoClear = true;
    gl.render(scene, camera);
    gl.autoClear = false;
    gl.clearDepth();
    gl.render(scene, ref.current);
    $.current.getContext("2d").drawImage(gl.domElement, 0, 0);
  });
  return FIBER.createPortal(<Cam ref={ref} {...other} />, viewport);
}

const style = {
  top: 0,
  left: 0,
  display: "grid",
  alignItems: "center",
  justifyContent: "center",
  gridTemplateRows: "auto auto",
  gridTemplateColumns: "auto auto"
};

render(<App style={style} />, document.getElementById("root"));
