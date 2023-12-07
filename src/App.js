import './App.css';
import {useState, useEffect} from 'react';

const bank1 = [
  {
    keyCode: 81,
    key: 'Q',
    id: 'heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    key: 'W',
    id: 'heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    key: 'E',
    id: 'heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    key: 'A',
    id: 'heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    key: 'S',
    id: 'clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    key: 'D',
    id: 'open-hh',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    key: 'Z',
    id: 'kick-n-hat',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    key: 'X',
    id: 'kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    key: 'C',
    id: 'closed-hh',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  },
];

const bank2 = [
  {
    keyCode: 81,
    key: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    key: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    key: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    key: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    key: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    key: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    key: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    key: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    key: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];

const soundBankNames = {
  heaterKit: "Heater Kit",
  smoothPianoKit: "Smooth Piano Kit"
};

const soundsGroup = {
  heaterKit: bank1,
  smoothPianoKit: bank2
};


const KeyboardKey = ({playKey, sound: {id, key, url, keyCode}}) => {
  const handleKeydown = (event) => {
    if (event.keyCode === keyCode) {
      playKey(key, id);
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown)
  })

  return (
    <button id={keyCode} className='drum-pad' onClick={() => playKey(key, id)}>
      <audio className='clip' id={key} src={url} />
      {key}
    </button>
  )
}

const Controls = ({onOff, power, name, changeBank, volume, handleVolumeChange}) => {
  return(
    <div>
    <button className='buttons' onClick={onOff}>Set Power {power ? 'OFF' :'ON'}</button>
      <h2 id='display'>{name}</h2>
      <h2>Volume: {Math.round(volume * 100)}%</h2>
      <input id='volume' max='1' min='0' step='0.01' type='range' value={volume} onChange={handleVolumeChange}/>
      <button className='buttons' onClick={changeBank}>Change Bank</button>
    </div>
  )
}

function App() {
  const [power, setPower] = useState(true);
  const [volume, setVolume] = useState(1);
  const [soundName, setSoundName] = useState("");
  const [soundType, setSoundType] = useState("heaterKit");
  const [sounds, setSounds] = useState(soundsGroup[soundType]);

  const playKey = (key, id) => {
    setSoundName(id);
    const audio = document.getElementById(key);
    audio.currentTime = 0;
    audio.play();
  }

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  }
  
  const onOff = () => {
    setPower(!power);
  }

  const setKeyVolume = () => {
    const audios = sounds.map(sound => document.getElementById(sound.key));
    audios.forEach(audio => {
      if (audio) {
        audio.volume = volume;
      }
    });
  }

  const Keyboard = ({sounds, playKey}) => {
    return power ? sounds.map((sound) => <KeyboardKey playKey={playKey} sound={sound}/>) : sounds.map((sound) => <KeyboardKey playKey={playKey} sound={{...sound, url: "#"}}/>)
  }

  const changeBank = () => {
    setSoundName("");
    if (soundType === "heaterKit") {
      setSoundType("smoothPianoKit");
      setSounds(soundsGroup.smoothPianoKit);
    } else {
      setSoundType("heaterKit");
      setSounds(soundsGroup.heaterKit)
    }
  }

  return (
    <div id='root'>
      <div id='drum-machine'>
        {setKeyVolume()}
        <div id='pad-bank'>
          <Keyboard power={power} sounds={sounds} playKey={playKey} />
        </div>
        <div className='controls'>
          <Controls onOff={onOff} power={power} name={soundName || soundBankNames[soundType]} changeBank={changeBank} volume={volume} handleVolumeChange={handleVolumeChange}/>
        </div>
      </div>
    </div>
  );
}

export default App;
