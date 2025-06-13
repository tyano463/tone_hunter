
const util = {
    midiToNoteName: (midiNumber) => {
        const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const octave = Math.floor(midiNumber / 12) - 1; // MIDIの0はC-1
        const note = notes[midiNumber % 12]
        return `${note}${octave}`;
    }
}

export default util