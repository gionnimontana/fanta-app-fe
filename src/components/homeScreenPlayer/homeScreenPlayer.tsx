import s from "./HomeScreenPlayer.module.css"

interface Props {
  children: React.ReactNode
}

export const HomeScreenPlayer = ({children}: Props) => {
    const handlePlay = () => {
        console.log('play')
    }
    const handlePause = () => {
        const audio = document.querySelector('audio')
        console.log('pause', audio)
    }

    return (
      <div className={s.container}>
          {children}
          <audio
              onPlay={handlePlay}
              onPause={handlePause}
              controls={true} 
              loop={true} 
              src="https://nsobm2vyz6op6fmexygddywwilqoregtfkpi3he7qyfjiypndjyq.arweave.net/bJwWarjPnP8VhL4MMeLWQuDokNMqno2cn4YKlGHtGnE">
          </audio>
      </div>
    )
}