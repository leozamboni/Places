import { useKeyboardControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { CapsuleCollider, RigidBody, useRapier } from "@react-three/rapier";
import React, { useRef } from "react";
import { Vector3 } from "three";
import * as RAPIER from "@dimforge/rapier3d-compat"

interface PlayerProps {
    position: Vector3,
    speed: number,
}

export function Player({ position, speed }: PlayerProps) {
    const direction = new Vector3()
    const frontVector = new Vector3()
    const sideVector = new Vector3()
    const ref = useRef() as any
    const rapier = useRapier()
    const [, get] = useKeyboardControls()
    const { camera } = useThree()
    camera.rotation.set(0, 9.8, 0)

    useFrame(() => {
        const { forward, backward, left, right, jump } = get()
        const velocity = ref.current.linvel()

        // update camera
        let p = ref.current.translation()
        console.log(p);
        
        camera.position.set(p.x, p.y, p.z)

        // movement
        frontVector.set(0, 0, Number(backward) - Number(forward))
        sideVector.set(Number(left) - Number(right), 0, 0)
        direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(speed).applyEuler(camera.rotation)
        ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z })

        // jumping
        const world = rapier.world.raw()
        const ray = world.castRay(new RAPIER.Ray(ref.current.translation(), { x: 0, y: -1, z: 0 }), 1, false)
        const grounded = ray && ray.collider && Math.abs(ray.toi) < 1
        if (jump && grounded) ref.current.setLinvel({ x: 0, y: 7.5, z: 0 })
    })

    return (
        <RigidBody ref={ref} colliders={false} mass={1} type="dynamic" position={position} enabledRotations={[false, false, false]}>
            <CapsuleCollider args={[0.70, 0.3]} />
        </RigidBody>
    )
}