// import React from 'react';

import coinUrl from "./coin.mp3";

const setState = (cb) => {
  state = cb(state);
};

let init = false;
const ctx = new AudioContext();
const gainNode = ctx.createGain();
let source = ctx.createBufferSource();

const useAlarm = () => {
  if (!init) {
    fetch(coinUrl)
      .then((res) => res.arrayBuffer())
      .then((data) => {
        console.log(typeof data);
        setState((prevState) => {
          return {
            ...prevState,
            data,
          };
        });
      })
      .catch((err) => console.log("Could not load audio file!\n", err));
    init = true;
  }
  return {
    startAlarm(willLoop = true) {
      const volume = 10;

      const { data } = state;
      const dataCloned = data.slice(0);
      ctx.decodeAudioData(data, (buffer) => {
        source.buffer = buffer;
        source.playbackRate.value = 2;
        source.loop = willLoop; // use his for setting state too as if false we don't need to update alarmOn state
        gainNode.gain.setValueAtTime(volume, ctx.currentTime);
        source.connect(gainNode);
        gainNode.connect(ctx.destination);
        source.start();
        setState((prevState) => {
          return {
            ...prevState,
            data: dataCloned,
            alarmOn: willLoop,
          };
        });
      });
    },
    stopAlarm() {
      source.stop();
      source = null;
      setState((prevState) => {
        return {
          ...prevState,
          alarmOn: false,
        };
      });
    },
  };
};

export default useAlarm;
