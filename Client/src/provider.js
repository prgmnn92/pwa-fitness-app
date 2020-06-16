import React from "react";

export const Context = React.createContext();

class Provider extends React.Component {
  state = {
    showNavbar: true,
    name: "Phillip",
    quickStart: {
      Bankdruecken: [
        {
          Wiederholungen: 10,
          Gewicht: 50,
          Complete: true,
        },
        {
          Wiederholungen: 10,
          Gewicht: 50,
          Complete: true,
        },
        {
          Wiederholungen: 10,
          Gewicht: 50,
          Complete: false,
        },
      ],
    },
  };
  render() {
    return (
      <Context.Provider
        value={{
          state: this.state,
          toggleNavbar: (val) => this.setState({ showNavbar: val }),
          addExercise: (name) =>
            this.setState({
              quickStart: {
                ...this.state.quickStart,
                [name]: [
                  {
                    Wiederholungen: 0,
                    Gewicht: 0,
                    Complete: false,
                  },
                ],
              },
            }),
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Provider;
