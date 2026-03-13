import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
	Img,
	staticFile,
} from 'remotion';

export const MuromachiExperience = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames, width, height} = useVideoConfig();

	// Global timing
	const scene1Start = 0;
	const scene2Start = 70;
	const scene3Start = 150;
	const scene4Start = 230;

	// Helper for spring
	const spr = (f, from = 0, to = 1) => spring({frame: f, fps, from, to, config: {damping: 12}});

	return (
		<AbsoluteFill style={{backgroundColor: '#080808', overflow: 'hidden'}}>
			{/* --- SCENE 1: GLITCH INTRO --- */}
			{frame < scene2Start && (
				<AbsoluteFill>
					<Img 
						src={staticFile('hero.png')} 
						style={{
							width: '100%', 
							height: '100%', 
							objectFit: 'cover',
							filter: `brightness(${interpolate(frame, [0, 10, 20, 30], [2, 1, 1.5, 1])}) contrast(1.2)`,
							transform: `scale(${interpolate(frame, [0, scene2Start], [1.1, 1])})`,
						}} 
					/>
					<AbsoluteFill style={{
						background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.8) 100%)',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
						<h1 style={{
							fontSize: 160, 
							color: '#d4af37', 
							letterSpacing: 40,
							textShadow: '0 0 50px rgba(212, 175, 55, 0.5)',
							opacity: spr(frame),
							transform: `translateY(${interpolate(frame, [0, 30], [50, 0])}px)`,
						}}>室町</h1>
						<div style={{
							position: 'absolute',
							width: '100%',
							height: 2,
							background: '#d4af37',
							top: '50%',
							opacity: interpolate(frame % 5, [0, 2], [0.8, 0]),
						}} />
					</AbsoluteFill>
				</AbsoluteFill>
			)}

			{/* --- SCENE 2: STARTUP REVOLUTION --- */}
			{frame >= scene2Start && frame < scene3Start && (
				<AbsoluteFill>
					<Img 
						src={staticFile('startup.png')} 
						style={{
							width: '100%', 
							height: '100%', 
							objectFit: 'cover',
							transform: `translateX(${interpolate(frame - scene2Start, [0, 80], [0, -50])}px) scale(1.05)`,
						}} 
					/>
					<AbsoluteFill style={{
						backgroundColor: 'rgba(0,0,0,0.4)',
						padding: 80,
					}}>
						<div style={{
							position: 'absolute',
							left: 80,
							bottom: 120,
							opacity: spr(frame - scene2Start),
							transform: `translateX(${interpolate(frame - scene2Start, [0, 20], [-100, 0])}px)`,
						}}>
							<span style={{color: '#d4af37', fontSize: 24, fontWeight: 'bold', border: '1px solid #d4af37', padding: '4px 12px'}}>REVOLUTION</span>
							<h2 style={{fontSize: 100, color: '#f9f7f2', margin: '20px 0'}}>武士による<br/>スタートアップ。</h2>
						</div>
					</AbsoluteFill>
				</AbsoluteFill>
			)}

			{/* --- SCENE 3: CULTURE DUALITY --- */}
			{frame >= scene3Start && frame < scene4Start && (
				<AbsoluteFill>
					<Img 
						src={staticFile('culture.png')} 
						style={{
							width: '100%', 
							height: '100%', 
							objectFit: 'cover',
							transform: `scale(${interpolate(frame - scene3Start, [0, 80], [1, 1.2])})`,
						}} 
					/>
					{/* Split Effect */}
					<div style={{
						position: 'absolute',
						width: '50%',
						height: '100%',
						left: 0,
						backgroundColor: 'rgba(212, 175, 55, 0.1)',
						borderRight: '1px solid rgba(212, 175, 55, 0.5)',
						backdropFilter: 'blur(4px)',
						transform: `translateX(${interpolate(frame - scene3Start, [0, 20], [-width / 2, 0])}px)`,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						padding: 60,
					}}>
						<h3 style={{fontSize: 80, color: '#d4af37'}}>北山</h3>
						<p style={{fontSize: 32, color: '#fff'}}>FLASHY & BOLD</p>
					</div>
					<div style={{
						position: 'absolute',
						width: '50%',
						height: '100%',
						right: 0,
						backgroundColor: 'rgba(0,0,0,0.6)',
						backdropFilter: 'blur(20px)',
						transform: `translateX(${interpolate(frame - scene3Start, [0, 25], [width / 2, 0])}px)`,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						padding: 60,
						textAlign: 'right',
					}}>
						<h3 style={{fontSize: 80, color: '#e0e0e0'}}>東山</h3>
						<p style={{fontSize: 32, color: '#fff'}}>SUBTLE & MINIMAL</p>
					</div>
				</AbsoluteFill>
			)}

			{/* --- SCENE 4: FINAL CTA --- */}
			{frame >= scene4Start && (
				<AbsoluteFill style={{
					backgroundColor: '#080808',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
					<div style={{
						width: 1000,
						height: 2,
						background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
						opacity: spr(frame - scene4Start),
					}} />
					<h2 style={{
						fontSize: 70,
						color: '#f9f7f2',
						margin: '40px 0',
						opacity: spr(frame - scene4Start - 10),
						textAlign: 'center',
					}}>
						日本文化のDNAを、<br/>今こそ。
					</h2>
					<div style={{
						padding: '20px 60px',
						border: '2px solid #d4af37',
						color: '#d4af37',
						fontSize: 40,
						letterSpacing: 10,
						opacity: spr(frame - scene4Start - 20),
					}}>ENTER ARCHIVE</div>
				</AbsoluteFill>
			)}
		</AbsoluteFill>
	);
};
