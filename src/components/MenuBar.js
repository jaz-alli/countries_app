import React from "react"
import { Button, Input, Box } from "@chakra-ui/react"

function MenuBar({
	onSearchTermChange,
	searchTerm,
	filterFavouriteCountries,
	showFavourites,
}) {
	return (
		<Box>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				padding="10px"
			>
				<Box width="50%" maxWidth="350px">
					<Input
						placeholder="Search Country, Language, Currency"
						value={searchTerm}
						onChange={onSearchTermChange}
					/>
				</Box>
				<Button
					color="white"
					onClick={filterFavouriteCountries}
					colorScheme="teal"
				>
					{showFavourites ? "Show All" : "My Favourites"}
				</Button>
			</Box>
		</Box>
	)
}

export default MenuBar
