import React from 'react';

const ToggleButtons = (props) => {

    let dogs = props.states.filteredDogs.length !== 0 ? 
    props.states.filteredDogs :
    props.dogs;

    const [toggle, setToggle] = React.useState({ name: 'A-Z', value: true });

    (function(){
        if(dogs[0] && dogs[0].id !== "notFound") {
            for (let i = 0; i < dogs.length; i++) {
                dogs[i].sum = parseInt(dogs[i].weight.split(' - ')[0]) +  
                    parseInt(dogs[i].weight.split(' - ')[1]) 
            }
        }
    })();

    function toggleDogs(prop) {
        
        if(toggle.value) {
            dogs = dogs.sort(
                function (a, b) {
                    if (a[prop] > b[prop]) return 1;
                    if (a[prop] < b[prop]) return -1;
                    return 0;
                }, prop);
            setToggle({name: 'A-Z', value: false });
        }

        else {
            dogs = dogs.sort(
                function (a, b) {
                    if (a[prop] > b[prop]) return -1;
                    if (a[prop] < b[prop]) return 1;
                    return 0;
                }, prop);
            setToggle({ name: 'Z-A', value: true });
        };
        return dogs;
    };
    
    function handleChange(event) {
        let dogsData = [];
        if(event.target.value === 'az') dogsData = toggleDogs('name');
        else dogsData = toggleDogs('sum');
        props.setStates({
            ...props.states,
            filteredDogs: dogsData
        });
    };

    return(
        <div>
            <div>
                <label className="toggleNames">
                    <span>{toggle.name}</span>
                    <input 
                        type="checkbox"
                        id="az"
                        value ='az'
                        onChange={ handleChange }
                    />
                    <span className="slider round"></span>
                </label>
            </div>
            <div>
            <label className="toggleWeight">
                    <span>weight</span>
                    <input 
                        type="checkbox"
                        id="kg"
                        value = 'kg'
                        onChange={ handleChange }
                    />
                    <span className="slider round"></span>
                </label>
            </div>
        </div>
    );
};

export default ToggleButtons;
