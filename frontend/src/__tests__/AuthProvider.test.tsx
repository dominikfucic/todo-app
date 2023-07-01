import { render, renderHook, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useContext } from "react";
import AuthProvider, { AuthContext } from "../providers/AuthProvider";
import { vi, it, describe, expect, Mock } from "vitest";
import api from "../axios";
import { AxiosError } from "axios";

vi.mock("../axios", async () => {
  return {
    default: {
      create: vi.fn(() => ({
        post: vi.fn(),
        get: vi.fn(),
      })),
      AxiosError: {} as AxiosError,
    },
  };
});

it("should render and provide correct context value to its children", () => {
  const { getByText } = render(
    <AuthProvider>
      <AuthContext.Consumer>
        {(context) => (
          <div>{context ? "Context exists" : "Context is null"}</div>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  );

  const contextText = getByText(/Context exists/i);
  expect(contextText).toBeInTheDocument();
});

it("should set inital state of user to null", () => {
  const { getByText } = render(
    <AuthProvider>
      <AuthContext.Consumer>
        {(context) => (
          <div>{context && context.user ? "User exists" : "User is null"}</div>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  );

  const userText = getByText(/User is null/i);
  expect(userText).toBeInTheDocument();
});

describe("login function", () => {
  const getItemSpy = vi.spyOn(Storage.prototype, "getItem");
  const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

  afterEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  const mockUser = {
    _id: "mockId",
    fullName: "mockFullName",
    email: "mockEmail",
  };

  const email = "mockEmail";
  const password = "mockPassword";

  it("should make correct API call, call getUser and update local storage accordingly", async () => {
    api.post = vi.fn().mockResolvedValue({ data: { token: "mockToken" } });
    api.get = vi.fn().mockResolvedValue({ data: mockUser });

    const { result } = renderHook(() => useContext(AuthContext), {
      wrapper: AuthProvider,
    });

    await act(async () => {
      await result.current?.login(email, password);
    });

    expect(result.current?.user).toEqual(mockUser);
    expect(api.post).toHaveBeenCalledWith("/users/login", {
      email,
      password,
    });
    expect(setItemSpy).toHaveBeenCalledWith("token", "mockToken");
    expect(setItemSpy).toHaveBeenCalledWith("user", JSON.stringify(mockUser));
    expect(getItemSpy).toHaveBeenCalledWith("user");
  });

  it("should throw an error if API call fails", async () => {
    api.post = vi.fn().mockRejectedValue({});

    const { result } = renderHook(() => useContext(AuthContext), {
      wrapper: AuthProvider,
    });

    await act(async () => {
      await result.current?.login(email, password);
    });

    expect(result.current?.error).toEqual("Something went wrong");
    expect(setItemSpy).not.toHaveBeenCalled();
  });
});

describe("signup function", () => {
  const getItemSpy = vi.spyOn(Storage.prototype, "getItem");
  const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

  const email = "mockEmail";
  const password = "mockPassword";
  const fullName = "mockFullName";

  afterEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  const mockUser = {
    _id: "mockId",
    fullName: "mockFullName",
    email: "mockEmail",
  };

  it("should make correct API call, call getUser and update local storage accordingly", async () => {
    api.post = vi.fn().mockResolvedValue({ data: { token: "mockToken" } });
    api.get = vi.fn().mockResolvedValue({ data: mockUser });

    const { result } = renderHook(() => useContext(AuthContext), {
      wrapper: AuthProvider,
    });

    await act(async () => {
      await result.current?.signup("mockEmail", "mockPassword", "mockFullName");
    });

    expect(api.post).toHaveBeenCalledWith("/users/signup", {
      email,
      password,
      fullName,
    });
    expect(result.current?.user).toEqual(mockUser);
    expect(setItemSpy).toHaveBeenCalledWith("token", "mockToken");
    expect(setItemSpy).toHaveBeenCalledWith("user", JSON.stringify(mockUser));
    expect(getItemSpy).toHaveBeenCalledWith("user");
  });
});

describe("logout function", () => {
  it("should update local storage and user state accordingly", async () => {
    const removeItemSpy = vi.spyOn(Storage.prototype, "removeItem");

    const { result } = renderHook(() => useContext(AuthContext), {
      wrapper: AuthProvider,
    });

    await act(async () => {
      result.current?.logout();
    });

    expect(result.current?.user).toEqual(null);
    expect(removeItemSpy).toHaveBeenCalledWith("token");
    expect(removeItemSpy).toHaveBeenCalledWith("user");
  });
});
