import React from "react";
import pf from "petfinder-client";
import { navigate } from "@reach/router";
import Carousel from "./Carousel";

const petfinder = pf({
  key: "cecfcb56de6eda9b8734b54c4401e977",
  secret: "7725f137257818b5119e2e5ccebdb211"
});

class Details extends React.Component {
  state = {
    loading: true
  };
  componentDidMount() {
    petfinder.pet
      .get({
        output: "full",
        id: this.props.id
      })
      .then(data => {
        const pet = data.petfinder.pet;
        let breed;
        if (Array.isArray(pet.breeds.breed)) {
          breed = pet.breeds.breed.join(", ");
        } else {
          breed = pet.breeds.breed;
        }

        this.setState({
          name: pet.name,
          animal: pet.animal,
          location: `${pet.contact.city}, ${pet.contact.state}`,
          description: pet.description,
          media: pet.media,
          breed,
          loading: false
        });
      })
      .catch(() => {
        navigate("/");
      });
  }

  render() {
    if (this.state.loading) {
      return <h2>loading ...</h2>;
    }
    const { name, animal, breed, location, description, media } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>
            {animal}- {breed} -{location}
          </h2>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default Details;
