import React, { useState, useEffect, useRef } from 'react';
import { Grid } from '@material-ui/core';

import { useStyles } from './styles';
import './styles.css';

import * as faceapi from 'face-api.js';

export default function FaceDetection() {
	const classes = useStyles();
	const videoRef = useRef(null);

	useEffect(() => {
		Promise.all([
			faceapi.nets.tinyFaceDetector.loadFromUri('../../../models'),
			faceapi.nets.faceLandmark68Net.loadFromUri('../../../models'),
			faceapi.nets.faceRecognitionNet.loadFromUri('../../../models'),
			faceapi.nets.faceExpressionNet.loadFromUri('../../../models'),
		]).then(getVideo());
	}, []);

	const getVideo = () => {
		navigator.mediaDevices
			.getUserMedia({ video: {} })
			.then((stream) => {
				let video = videoRef.current;
				video.srcObject = stream;
				video.play();
			})
			.catch((err) => {
				console.error('error:', err);
			});
	};

	return (
		<Grid
			container
			align='center'
			justify='center'
			spacing={3}
			className={classes.componentGrid}
		>
			<h2>Try our Face Detection Engine</h2>

			<Grid item xs={12}>
				<video
					ref={videoRef}
					width='720'
					height='560'
					autoplay
					muted
					onLoadedMetadata={() => {
						let video = videoRef.current;
						const canvas = faceapi.createCanvasFromMedia(video);
						document.body.append(canvas);
						const displaySize = { width: video.width, height: video.height };
						faceapi.matchDimensions(canvas, displaySize);

						setInterval(async () => {
							const detections = await faceapi
								.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
								.withFaceLandmarks()
								.withFaceExpressions();

							const resizedDetections = faceapi.resizeResults(
								detections,
								displaySize,
							);
							canvas
								.getContext('2d')
								.clearRect(0, 0, canvas.width, canvas.height);

							faceapi.draw.drawDetections(canvas, resizedDetections);
							faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
							faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
						}, 100);
					}}
				></video>
			</Grid>
		</Grid>
	);
}
