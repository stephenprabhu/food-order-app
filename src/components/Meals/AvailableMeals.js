import React,{useState} from "react";
import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect } from "react";

const AvailableMeals = () => {
  const [meals, setMeals]= useState([]);
  const [isLoading, setIsLoading]=useState(true);
  const [httpError, setHttpError]=useState(null);

  useEffect(()=>{
      getMeals();
  },[]);

  const getMeals= async()=>{
    try{
      const res= await fetch("https://stock-market-2d727-default-rtdb.firebaseio.com/meals.json");
      if(!res.ok){
        throw new Error('Something Went Wrong!')
      }
      const output = await res.json();
      const loadedMeals = [];
      for(const key in output){
        loadedMeals.push({
          id: key,
          name: output[key].name,
          description: output[key].description,
          price: output[key].price
        });
      }
      setMeals(loadedMeals);
    }catch(error){
      setHttpError(error.message);
    }
    setIsLoading(false);
  }

  const meals_list = meals.map((meal) => (
    <MealItem
    id={meal.id}
    key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  if(isLoading){
    return <section className={styles.mealsLoading}><p>Loading.....</p></section>
  }
  if(httpError){
    return <section className={styles.mealsError}><p>The Server Encountered An Error! :(</p></section>

  }
  return (
    <section className={styles.meals}>
      <Card>
        <ul>{meals_list}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
