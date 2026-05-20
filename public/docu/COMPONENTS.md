# OmniWatch Components

## WatchFrame
The outer shell styled like a physical smartwatch. Wraps all other components.

### Props
| Prop | Type | Description |
|----------|------|-------------------------------|
| children | node | Components rendered inside the watch screen |

### Example
```jsx
<WatchFrame>
  <TimeDisplay
    hours="10"
    minutes="42"
    seconds="05"
    format="12"
  />
</WatchFrame>
```

---

## TimeDisplay
Shows the current time. Supports 12hr and 24hr format.

### Props
| Prop | Type | Description |
|---------|--------|-------------------------------|
| hours | string | The hour value to display |
| minutes | string | The minutes value to display |
| seconds | string | The seconds value to display |
| format | string | Either `'12'` or `'24'` |

### Example
```jsx
<TimeDisplay
  hours="22"
  minutes="42"
  seconds="05"
  format="12"
/>
```

---

## StatRing
A circular progress indicator for fitness stats.

### Props
| Prop | Type | Description |
|-------|--------|------------------------------------------|
| label | string | The stat name shown below the value |
| value | string | The current value displayed |
| target | string | The goal value |
| color | string | Tailwind border color class for the ring |

### Example
```jsx
<StatRing
  label="Steps"
  value="8,432"
  target="10,000"
  color="border-green-500"
/>
```

---

## StopwatchWidget
Displays the stopwatch screen with timer, lap list, and control buttons.

### Props
| Prop | Type | Description |
|-------------|------------|-------------------------------------------------------|
| currentTime | string | Formatted elapsed time string e.g. `"01:23.45"` |
| isRunning | boolean | Controls timer text color (green when true) |
| lapTimes | string[] | Array of formatted lap time strings |
| onStart | () => void | Called when Start button is pressed |
| onStop | () => void | Called when Stop button is pressed |
| onReset | () => void | Called when Reset button is pressed |
| onLap | () => void | Called when Lap button is pressed |

### Example
```jsx
<StopwatchWidget
  currentTime="01:23.45"
  isRunning={true}
  lapTimes={["00:58.20", "00:25.25"]}
  onStart={() => console.log("Start")}
  onStop={() => console.log("Stop")}
  onReset={() => console.log("Reset")}
  onLap={() => console.log("Lap")}
/>
```