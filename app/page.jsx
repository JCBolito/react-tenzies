"use client";
import React from "react";
import Image from 'next/image';
import styles from './page.module.css';
import Die from "./(components)/Die";
import { nanoid } from "nanoid";
import { useWindowSize } from "react-use";
import ReactConfetti from "react-confetti";

export default function Home() {
	const [dice, setDice] = React.useState(
		[
			{
				id: nanoid(),
				value: 1,
				image: "/d1.png",
				isHeld: false
			}
		]
	);
	const [tenzies, setTenzies] = React.useState(false);
	const [rolls, setRolls] = React.useState(0);

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
		const value = Math.ceil(Math.random() * 6);
		return (
			{
				id: nanoid(),
				value: value,
				image: `/d${value}.png`,
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
			setRolls(rolls + 1);
			setDice(oldDice => oldDice.map(die => {
				return die.isHeld ? die : generateNewDie();
			}));

		} else {
			setTenzies(false);
			setDice(allNewDice());
			setRolls(0);
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
				image={die.image}
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
			<p>Rolls: {rolls}</p>
			<button onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
		</main>
	);
}
