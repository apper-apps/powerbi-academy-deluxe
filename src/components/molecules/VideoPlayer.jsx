import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactPlayer from 'react-player'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const VideoPlayer = ({ 
  videoUrl, 
  chapters = [], 
  onProgress, 
  onChapterChange,
  className = "" 
}) => {
  const [playing, setPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [muted, setMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [currentChapter, setCurrentChapter] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showChapters, setShowChapters] = useState(false)
  
  const playerRef = useRef(null)
  const containerRef = useRef(null)
  const controlsTimeoutRef = useRef(null)

  // Auto-hide controls
  useEffect(() => {
    if (playing && showControls) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }
    
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [playing, showControls])

  // Update current chapter based on time
  useEffect(() => {
    if (chapters.length > 0) {
      const chapter = chapters.findIndex((ch, index) => {
        const nextChapter = chapters[index + 1]
        return currentTime >= ch.time && (!nextChapter || currentTime < nextChapter.time)
      })
      if (chapter !== -1 && chapter !== currentChapter) {
        setCurrentChapter(chapter)
        onChapterChange?.(chapters[chapter])
      }
    }
  }, [currentTime, chapters, currentChapter, onChapterChange])

  const handlePlayPause = () => {
    setPlaying(!playing)
    setShowControls(true)
  }

  const handleProgress = (state) => {
    setCurrentTime(state.playedSeconds)
    onProgress?.(state)
  }

  const handleDuration = (duration) => {
    setDuration(duration)
  }

  const handleSeek = (time) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time)
      setCurrentTime(time)
    }
  }

  const handleChapterClick = (chapter) => {
    handleSeek(chapter.time)
    setShowChapters(false)
  }

  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    setMuted(newVolume === 0)
  }

  const toggleMute = () => {
    setMuted(!muted)
  }

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div 
      ref={containerRef}
      className={`relative bg-black rounded-lg overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => playing && setShowControls(false)}
    >
      {/* Video Player */}
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        playing={playing}
        volume={muted ? 0 : volume}
        onProgress={handleProgress}
        onDuration={handleDuration}
        width="100%"
        height="100%"
        style={{ aspectRatio: '16/9' }}
      />

      {/* Play/Pause Overlay */}
      <AnimatePresence>
        {!playing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30"
          >
            <Button
              variant="ghost"
              onClick={handlePlayPause}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white border-white border-2 w-16 h-16 rounded-full flex items-center justify-center"
            >
              <ApperIcon name="Play" className="w-8 h-8 ml-1" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent p-4"
          >
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="w-full h-1 bg-white bg-opacity-30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              
              {/* Chapter Markers */}
              {chapters.map((chapter, index) => (
                <div
                  key={index}
                  className="absolute top-0 w-2 h-1 bg-yellow-400 rounded-full cursor-pointer"
                  style={{ left: `${(chapter.time / duration) * 100}%` }}
                  onClick={() => handleChapterClick(chapter)}
                  title={chapter.title}
                />
              ))}
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Play/Pause */}
                <Button
                  variant="ghost"
                  onClick={handlePlayPause}
                  className="text-white hover:bg-white hover:bg-opacity-20 p-2"
                >
                  <ApperIcon name={playing ? "Pause" : "Play"} className="w-5 h-5" />
                </Button>

                {/* Volume */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    onClick={toggleMute}
                    className="text-white hover:bg-white hover:bg-opacity-20 p-2"
                  >
                    <ApperIcon 
                      name={muted || volume === 0 ? "VolumeX" : volume < 0.5 ? "Volume1" : "Volume2"} 
                      className="w-5 h-5" 
                    />
                  </Button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={muted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-white bg-opacity-30 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Time Display */}
                <div className="text-white text-sm font-mono">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Chapters */}
                {chapters.length > 0 && (
                  <div className="relative">
                    <Button
                      variant="ghost"
                      onClick={() => setShowChapters(!showChapters)}
                      className="text-white hover:bg-white hover:bg-opacity-20 p-2"
                    >
                      <ApperIcon name="List" className="w-5 h-5" />
                    </Button>

                    <AnimatePresence>
                      {showChapters && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute bottom-full right-0 mb-2 bg-black bg-opacity-90 rounded-lg p-2 min-w-64"
                        >
                          <div className="max-h-48 overflow-y-auto">
                            {chapters.map((chapter, index) => (
                              <button
                                key={index}
                                onClick={() => handleChapterClick(chapter)}
                                className={`w-full text-left p-2 rounded hover:bg-white hover:bg-opacity-20 transition-colors ${
                                  index === currentChapter ? 'bg-white bg-opacity-20' : ''
                                }`}
                              >
                                <div className="text-white text-sm font-medium">{chapter.title}</div>
                                <div className="text-gray-300 text-xs">{formatTime(chapter.time)}</div>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Fullscreen */}
                <Button
                  variant="ghost"
                  onClick={toggleFullscreen}
                  className="text-white hover:bg-white hover:bg-opacity-20 p-2"
                >
                  <ApperIcon name={isFullscreen ? "Minimize2" : "Maximize2"} className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default VideoPlayer