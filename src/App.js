import React from 'react';
import Timer from './Timer/Timer'

function App() {
  return (
    <div>
      <Timer
             time={60000} // in ms
             step={1000}
      />
      <Timer
             time={5000} // in ms
             autostart
             step={1000} // in ms
             infinite
      />
      <Timer
             time={16000} // in ms
             onTick={(time) => console.log('Timer III: ' + time / 1000 + ' sec is left')}
             onTimeStart={() => console.log("Timer III запущено!")}
             onTimePause={() => console.log("Timer III на паузі!")}
             onTimeEnd={() => console.log("Timer III - час вийшов!")}
             autostart
             step={2000} // in ms
      />
    </div>
  );
}

export default App;
