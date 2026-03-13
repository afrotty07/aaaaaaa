import {Composition} from 'remotion';
import {MuromachiExperience} from './MuromachiExperience';

export const RemotionVideo = () => {
	return (
		<>
			<Composition
				id="MuromachiPromo"
				component={MuromachiExperience}
				durationInFrames={300}
				fps={30}
				width={1920}
				height={1080}
			/>
		</>
	);
};
