import { useKeyboardControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import React, { useRef } from "react";
import { Vector3 } from "three";


export function Player() {
    const SPEED = 5
    const direction = new Vector3()
    const frontVector = new Vector3()
    const sideVector = new Vector3()
    const ref = useRef() as any
    const [, get] = useKeyboardControls()
    const { camera } = useThree()

    useFrame(() => {
        const { forward, backward, left, right, jump } = get()
        const velocity = ref.current?.linvel() ?? 10

        // update camera
        let p = ref.current.translation()
        camera.position.set(p.x, p.y, p.z)

        // movement
        frontVector.set(0, 0, Number(backward) - Number(forward))
        sideVector.set(Number(left) - Number(right), 0, 0)
        direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(camera.rotation)
        ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z })

        // jumping
        const grounded = p.y <= -7
        if (jump && grounded) ref.current.setLinvel({ x: 0, y: 5.5, z: 0 })
    })

    return (
        <RigidBody ref={ref} colliders={false} mass={1} type="dynamic" position={[0, 10, 0]} enabledRotations={[false, false, false]}>
            <CapsuleCollider args={[0.70, 0.3]} />
        </RigidBody>
    )
}