import { Switch } from '@headlessui/react'

interface SwitchToggleProps {
  enabled: boolean
  onChange: (enabled: boolean) => void
}

export function SwitchToggle({
  enabled,
  onChange
}: SwitchToggleProps) {

  return (
    <Switch.Group>
      <div className="flex items-center flex-row justify-between">
        <Switch.Label className="mr-4">Side By Side</Switch.Label>
        <Switch
          checked={enabled}
          onChange={onChange}
          className={`${
            enabled ? 'bg-model-blue' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              enabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </Switch>
      </div>
    </Switch.Group>
  )
}
