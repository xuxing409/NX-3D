import { Camera, PerspectiveCamera, OrthographicCamera, MathUtils } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export enum CAMERA_MODE {
  CAMERA_2D = '2D',
  CAMERA_3D = '3D'
}

export class CameraController {
  camera2D: OrthographicCamera

  camera3D: PerspectiveCamera

  viewportCamera: Camera

  cameraMode: CAMERA_MODE = CAMERA_MODE.CAMERA_3D

  controls: OrbitControls

  constructor(renderer: THREE.WebGLRenderer) {
    const width = renderer.domElement.offsetWidth
    const height = renderer.domElement.offsetHeight
    const aspect = width / height

    this.camera2D = new OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      1,
      1000
    )
    this.camera2D.position.set(0, 50, 0)
    // this.camera2D.lookAt(0, 0, 0);

    this.camera3D = new PerspectiveCamera(30, aspect, 1, 3000)

    this.camera3D.position.set(50, 50, 50)
    this.camera3D.lookAt(0, 0, 0)

    this.viewportCamera = this.camera3D
    this.controls = new OrbitControls(this.viewportCamera, renderer.domElement)
    this.controls.enableDamping = true
    this.controls.maxPolarAngle = MathUtils.degToRad(89)
    this.controls.screenSpacePanning = false
    this.controls.update()
  }

  changeMode() {
    const { CAMERA_2D, CAMERA_3D } = CAMERA_MODE
    this.cameraMode = this.cameraMode === CAMERA_2D ? CAMERA_3D : CAMERA_2D

    if (this.cameraMode === CAMERA_2D) {
      this.viewportCamera = this.camera2D

      this.controls.object = this.camera2D
      this.controls.enableRotate = false
    } else {
      this.viewportCamera = this.camera3D
      this.controls.object = this.camera3D
      this.controls.enableRotate = true
    }

    this.viewportCamera.lookAt(this.controls.target)
  }
}
