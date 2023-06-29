import { render, renderHook, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useContext } from "react";
import AuthProvider, { AuthContext } from "../providers/AuthProvider";
import { vi, it, describe, expect, Mock } from "vitest";
import api from "../axios";

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
    vi.clearAllMocks();
    localStorage.clear();
  });

  const mockUser = {
    _id: "mockId",
    firstName: "mockFirstName",
    email: "mockEmail",
  };

  const email = "mockEmail";
  const password = "mockPassword";

  it("should make correct API call, call getUser and update local storage accordingly", async () => {
    vi.mock("axios", async () => {
      return {
        default: {
          create: vi.fn(() => ({
            post: vi.fn().mockResolvedValue({ data: { token: "mockToken" } }),
            get: vi.fn().mockResolvedValue({
              data: {
                _id: "mockId",
                firstName: "mockFirstName",
                email: "mockEmail",
              },
            }),
          })),
          AxiosError: {},
        },
      };
    });

    const { result } = renderHook(() => useContext(AuthContext), {
      wrapper: AuthProvider,
    });

    await act(async () => {
      await result.current?.login(email, password);
    });

    expect(result.current?.user).toEqual(mockUser);
    expect(api.post as Mock).toHaveBeenCalledWith("/users/login", {
      email,
      password,
    });
    expect(setItemSpy).toHaveBeenCalledWith("token", "mockToken");
    expect(setItemSpy).toHaveBeenCalledWith("user", JSON.stringify(mockUser));
    expect(getItemSpy).toHaveBeenCalledWith("user");
  });

  // it("should throw an error if there is no token", async () => {
    
  //   const { result } = renderHook(() => useContext(AuthContext), {
  //     wrapper: AuthProvider,
  //   });

  //   await act(async () => {
  //     await result.current?.login(email, password);
  //   });

  //   expect();
  // });
});

// describe("signup function", () => {
//   vi.mock("axios", async () => {
//     return {
//       default: {
//         create: vi.fn(() => ({
//           post: vi.fn().mockResolvedValue({ data: { token: "mockToken" } }),
//           get: vi.fn().mockResolvedValue({
//             data: {
//               _id: "mockId",
//               firstName: "mockFirstName",
//               email: "mockEmail",
//             },
//           }),
//         })),
//         AxiosError: {},
//       },
//     };
//   });

//   const getItemSpy = vi.spyOn(Storage.prototype, "getItem");
//   const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

//   afterAll(() => {
//     vi.clearAllMocks();
//     localStorage.clear();
//   });

//   const mockUser = {
//     _id: "mockId",
//     firstName: "mockFirstName",
//     email: "mockEmail",
//   };

//   it("should make correct API call, call getUser and update local storage accordingly", async () => {
//     const { result } = renderHook(() => useContext(AuthContext), {
//       wrapper: AuthProvider,
//     });

//     await act(async () => {
//       await result.current?.login("mockEmail", "mockPassword");
//     });

//     expect(result.current?.user).toEqual(mockUser);
//     expect(setItemSpy).toHaveBeenCalledWith("token", "mockToken");
//     expect(setItemSpy).toHaveBeenCalledWith("user", JSON.stringify(mockUser));
//     expect(getItemSpy).toHaveBeenCalledWith("user");
//   });
// });
// describe("logout function", () => {
//   it("should update local storage and user state accordingly", () => {});
// });
