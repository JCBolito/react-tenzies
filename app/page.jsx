"use client";
import React from "react";
import Image from 'next/image';
import styles from './page.module.css';
import Die from "./(components)/Die";
import { nanoid } from "nanoid";
import { useWindowSize } from "react-use";
import ReactConfetti from "react-confetti";

export default function Home() {
	const [dice, setDice] = React.useState([{ id: nanoid() }]);
	const [tenzies, setTenzies] = React.useState(false);

	React.useEffect(() => {
		setDice(allNewDice);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	React.useEffect(() => {
		const allHeld = dice.every(die => die.isHeld);
		const valueReference = dice[0].value;
		const allSameValue = dice.every(die => die.value == valueReference);
		if (allHeld && allSameValue) {
			setTenzies(true);
			console.log("You won!");
		}
	}, [dice]);

	function generateNewDie() {
		return (
			{
				id: nanoid(),
				value: Math.ceil(Math.random() * 6),
				isHeld: false
			}
		);
	}

	function allNewDice() {
		const newDice = [];
		for (let i = 1; i <= 10; i++) {
			newDice.push(generateNewDie());
		}
		return newDice;
	}

	function rollDice() {
		if (!tenzies) {
			setDice(oldDice => oldDice.map(die => {
				return die.isHeld ? die : generateNewDie();
			}));

		} else {
			setTenzies(false);
			setDice(allNewDice());
		}

	}

	function holdDice(id) {
		if (!tenzies) {
			setDice(oldDice => oldDice.map(die => {
				return die.id == id ? { ...die, isHeld: !die.isHeld } : die;
			}));
		}
	}

	const diceElements = dice.map(die => {
		return (
			<Die
				key={die.id}
				value={die.value}
				isHeld={die.isHeld}
				holdDice={() => holdDice(die.id)}
			/>
		);
	});

	const { width, height } = useWindowSize();
	return (
		<main className={styles.main}>
			{tenzies ? <ReactConfetti width={width} height={height} /> : ""}
			<h1>{tenzies ? "You Won!" : "Tenzies"}</h1>
			<p>
				Roll until all dice are the same. Click
				each die to freeze it at its current value
				between rolls.
			</p>
			<div className={styles.diceContainer}>
				{diceElements}
			</div>
			<button onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
		</main>
	);
}
