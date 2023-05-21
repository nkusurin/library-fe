import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Search from "../src/components/Search";

describe("Search", () => {
  test("callingg function handleSearch on input change", () => {
    const handleSearchMock = jest.fn();
    const { getByPlaceholderText } = render(
      <Search handleSearch={handleSearchMock} />
    );

    const inputElement = getByPlaceholderText("Unesi upit za pretragu...");
    const searchQuery = "query";

    fireEvent.change(inputElement, { target: { value: searchQuery } });

    expect(inputElement.value).toBe(searchQuery);
    expect(handleSearchMock).toHaveBeenCalledWith(searchQuery);
  });
});
