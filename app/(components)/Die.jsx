import styles from "./Die.module.css";
import Image from "next/image";

export default function Die(props) {
	const isHeldStyles = {
		position: "relative",
		backgroundColor: props.isHeld ? "#59E391" : "white"
	};
	return (
		<div
			className={styles.die}
			style={isHeldStyles}
			onClick={props.holdDice}
		>
			<Image
				src={props.image}
				alt={props.value}
				fill
				priority
				sizes="(max-width: 3.5rem)"
			/>
		</div>
	);
}