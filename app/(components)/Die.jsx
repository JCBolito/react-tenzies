import styles from "./Die.module.css";

export default function Die(props) {
	const isHeldStyles = {
		backgroundColor: props.isHeld ? "#59E391" : "white"
	};
	return (
		<div
			className={styles.die}
			style={isHeldStyles}
			onClick={props.holdDice}
		>
			<h2>{props.value}</h2>
		</div>
	);
}