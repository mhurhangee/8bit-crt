'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { EBButton } from "./EBButton"
import {
  EBDropdown,
  EBDropdownTrigger,
  EBDropdownContent,
  EBDropdownItem,
} from "./EBDropdown"

interface EffectState {
  pixel: boolean
  scanline: boolean
  vignette: boolean
  textShadow: boolean
  textFlicker: boolean
  phosphor: boolean
}

export default function CRTEffect() {
  const [effects, setEffects] = useState<EffectState>({
    pixel: true,
    scanline: true,
    vignette: true,
    textShadow: true,
    textFlicker: true,
    phosphor: true
  })
  const [isOpen, setIsOpen] = useState(false)

  const toggleEffect = useCallback((effect: keyof EffectState) => {
    setEffects(prev => ({ ...prev, [effect]: !prev[effect] }))
  }, [])

  const toggleAll = useCallback(() => {
    const allOn = Object.values(effects).every(v => v)
    setEffects(prev => {
      const newEffects: EffectState = { ...prev }
      Object.keys(newEffects).forEach(key => {
        newEffects[key as keyof EffectState] = !allOn
      })
      return newEffects
    })
  }, [effects])

  useEffect(() => {
    document.body.classList.toggle('crt-text-shadow', effects.textShadow)
    document.body.classList.toggle('crt-text-flicker', effects.textFlicker)
    document.body.classList.toggle('crt-phosphor', effects.phosphor)
  }, [effects.textShadow, effects.textFlicker, effects.phosphor])

  const handleSelect = useCallback((callback: () => void) => {
    callback()
    // We're not closing the dropdown here
  }, [])

  return (
    <>
      <div className="crt-effects">
        {Object.entries(effects).map(([key, value]) => 
          !['textShadow', 'textFlicker', 'phosphor'].includes(key) && 
          <div key={key} className={`crt-${key} ${value ? 'active' : ''}`} />
        )}
      </div>
      <div className="eb-dropdown-wrapper">
        <EBDropdown open={isOpen} onOpenChange={setIsOpen}>
          <EBDropdownTrigger asChild>
            <EBButton variant="eightBit" size="sm" className="eb-dropdown-button eight-bit-text">
              FX
            </EBButton>
          </EBDropdownTrigger>
          <EBDropdownContent className="eb-dropdown-content" align="start" alignOffset={0} sideOffset={5}>
            <EBDropdownItem onSelect={() => handleSelect(toggleAll)}>
              All: {Object.values(effects).every(v => v) ? 'On' : 'Off'}
            </EBDropdownItem>
            {Object.entries(effects).map(([key, value]) => (
              <EBDropdownItem key={key} onSelect={() => handleSelect(() => toggleEffect(key as keyof EffectState))}>
                {key.charAt(0).toUpperCase() + key.slice(1)}: {value ? 'On' : 'Off'}
              </EBDropdownItem>
            ))}
          </EBDropdownContent>
        </EBDropdown>
      </div>
    </>
  )
}