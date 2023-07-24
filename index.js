const fs = require('fs')
const csvParser = require('csv-parser');

let names = []
let emails = []
fs.createReadStream("./input.csv")
	.pipe(csvParser())
	.on("data", function (row) {
		// console.log('row', row);

		// build name and email list here
		names.push(row.Name);
		emails.push(row.Email);
	})
	.on("error", function (error) {
		console.log(error.message);
	})
	.on("end", function () {
		// Create a copy of the emails array for shuffling
		let shuffledEmails = [...emails];
		let isShuffling = true;

		// Keep shuffling until no one is assigned to themselves
		while (isShuffling) {
			isShuffling = false;
			// shuffle the array
			shuffledEmails = shuffledEmails.sort(() => Math.random() - 0.5);

			// Check if anyone is assigned to themselves
			for (let i = 0; i < emails.length; i++) {
				// If anyone is assigned to themselves, set isShuffling to true
				if (emails[i] === shuffledEmails[i]) {
					isShuffling = true;
					break;
				}
			}
		}

		// Print the gift exchange pairs
		for (let i = 0; i < emails.length; i++) {
			console.log(`${emails[i]} -> ${shuffledEmails[i]}`);
		}
		// console.log("finished");
	});

