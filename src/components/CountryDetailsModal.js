import React from "react"
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Button,
	Box,
	Text,
} from "@chakra-ui/react"
import { StarIcon } from "@chakra-ui/icons"

function CountryDetailsModal({
	isOpen,
	onClose,
	selectedCountry,
	handleFavouritesClick,
	favourites,
}) {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader textAlign="center">
					{selectedCountry.name.common}
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody textAlign="left" margin="auto">
					<img
						src={selectedCountry.flags.png}
						alt={selectedCountry.flags.alt}
						width="100"
						style={{ margin: "auto" }}
					/>
					<Box marginTop="20px">
						<Text>
							<Text as="span" fontWeight="bold">
								Official Name:{" "}
							</Text>
							{selectedCountry.name.official}
						</Text>
						<Text>
							<Text as="span" fontWeight="bold">
								Capital:{" "}
							</Text>
							{Object.values(selectedCountry.capital || {}).join(", ")}
						</Text>
						<Text>
							<Text as="span" fontWeight="bold">
								Population:{" "}
							</Text>
							{selectedCountry.population.toLocaleString()}
						</Text>
						<Text>
							<Text as="span" fontWeight="bold">
								Languages:{" "}
							</Text>
							{Object.values(selectedCountry.languages || {}).join(", ")}
						</Text>
						<Text>
							<Text as="span" fontWeight="bold">
								Currencies:{" "}
							</Text>
							{Object.values(selectedCountry.currencies || {})
								.map(
									(currency) =>
										currency.name.charAt(0).toUpperCase() +
										currency.name.slice(1) +
										" (" +
										currency.symbol +
										")"
								)
								.join(", ")}
						</Text>
						<Text>
							<Text as="span" fontWeight="bold">
								Area:{" "}
							</Text>
							{selectedCountry.area} km²
						</Text>
						<Text>
							<Text as="span" fontWeight="bold">
								Region:{" "}
							</Text>
							{selectedCountry.region}
						</Text>
						<Text>
							<Text as="span" fontWeight="bold">
								Timezones:{" "}
							</Text>
							{Object.values(selectedCountry.timezones || {}).join(", ")}
						</Text>
					</Box>
				</ModalBody>
				<ModalFooter>
					<Button
						rightIcon={
							favourites.includes(selectedCountry.name.common) ? (
								<StarIcon />
							) : null
						}
						bg={
							!favourites.includes(selectedCountry.name.common)
								? "black"
								: "teal"
						}
						color="white"
						colorScheme={
							favourites.includes(selectedCountry.name.common)
								? "teal"
								: "black"
						}
						mr={3}
						onClick={() => handleFavouritesClick(selectedCountry.name.common)}
					>
						{!favourites.includes(selectedCountry.name.common)
							? "Add to favourites"
							: "Favourited"}
					</Button>
					<Button variant="ghost" onClick={onClose}>
						Cancel
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default CountryDetailsModal
