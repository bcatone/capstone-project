import React, { useEffect } from "react";

export const getCountries = () => {
    fetch("/countries").then((resp) => {
        if (resp.ok) {
          resp.json().then((countries) => {
            dispatch(updateCountries);
            setFormOptions({ ...formOptions, countries: countries });
          });
        } else {
          resp.json().then((errors) => console.log(errors));
        }
      });
}