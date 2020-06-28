import React from 'react';

import './progress-bar.styles.scss';

const ProgressBar = () => (
	<div className="progress-bar">
		<div className="progress-bar__text">Guten Tag Phillip!</div>
		<div className="progress-bar__text">4/5 Trainings abgeschlossen</div>
		<div className="progress-bar__fill" style={{ width: '80%' }} />
		<div className="progress-bar__bg" style={{ width: '100%' }} />
	</div>
);

export default ProgressBar;
