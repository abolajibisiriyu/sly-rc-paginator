import React from "react";
import Paginator from "../index";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

let paginatorMeta, paginatorOptions, onPageChanged;

beforeAll(() => {
  paginatorMeta = {
    totalItems: 20,
    currentPage: 1,
    itemsPerPage: 10
  };
  paginatorOptions = {
    ulClassName: "ulClassName",
    liClassName: "liClassName",
    activeClassName: "activeClassName",
    disabledClassName: "disabledClassName",
    anchorClassName: "anchorClassName"
  };
  onPageChanged = jest.fn(nextPage => nextPage);
});

describe("Paginator Component", () => {
  test("renders correctly", () => {
    const paginatorTree = renderer
      .create(
        <Paginator
          meta={paginatorMeta}
          options={paginatorOptions}
          onPageChange={onPageChanged}
        />
      )
      .toJSON();
    expect(paginatorTree).toMatchSnapshot();
  });

  test("renders a list of links", () => {
    const wrapper = shallow(
      <Paginator
        meta={paginatorMeta}
        options={paginatorOptions}
        onPageChange={onPageChanged}
      />
    );
    expect(wrapper.find("ul")).toHaveLength(1);
    expect(wrapper.find("li").length).toBeGreaterThan(4);
    wrapper.find("li").forEach(node => {
      expect(node.find("a")).toHaveLength(1);
    });
  });

  test("renders a list li with className of paginatorOptions liClassName", () => {
    const wrapper = shallow(
      <Paginator
        meta={paginatorMeta}
        options={paginatorOptions}
        onPageChange={onPageChanged}
      />
    );
    wrapper.find("li").forEach(node => {
      expect(node.prop("className")).toContain(paginatorOptions.liClassName);
    });
  });
});
