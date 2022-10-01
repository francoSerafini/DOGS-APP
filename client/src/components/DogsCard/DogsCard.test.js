import '@testing-library/jest-dom';
import { configure, shallow } from 'enzyme';
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import  DogsCard  from './DogsCard';
import isReact from 'is-react';

configure({ adapter: new Adapter() });

describe('<DogDetail />', () => {
    let dogsCard;
    const dog = {
        id:1,
        name:"Affenpinscher",
        weight:"3 - 6",
        temperaments:"Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
        image:"https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"
    };

beforeEach(() => {
    dogsCard = (dog) =>
        shallow(
            <DogsCard
                key={dog.id} 
                name={dog.name} 
                image={dog.image}
                temperaments={dog.temperaments} 
                weight={dog.weight}
            />
        );
    expect(isReact.classComponent(DogsCard)).toBeFalsy();
});

it('Should render <DogsCard/> correctly', () => {
    expect(dogsCard).toMatchSnapshot();
});

it('Should render an "h2" containing breed of dog', () => {
    expect(dogsCard(dog).find('h2').text()).toBe(
        dog.name
    );
});

it('Should render an "img" tag and use the image of the dogs breed as the source', () => {
    expect(dogsCard(dog).find('img').prop('src')).toEqual(
        dog.image
    );
})

it('Should render an "h3" containing the text "Temperaments: " plus the dogs breed temperaments', () => {
    expect(dogsCard(dog).find('h3').at(0).text()).toBe(
        `Temperaments: ${dog.temperaments}`
    );
});

it('Should render an "h3" containig the text "Weight: " plus the dogs breed weight', () => {
    expect(dogsCard(dog).find('h3').at(1).text()).toBe(
        `Weight: ${dog.weight}Kg`
    )
})

});