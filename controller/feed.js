exports.getBMI= async (req,res,next)=>{
    const data=req.body;
    let result=[];
    try {
        let owcount=0;
        await data.forEach(element => {                     //with converting CM to M
            let bmi=element.WeightKg/(element.HeightCm/100);//calculate bmi using formula 1 with 
            const cat_risk=findCat_Health(bmi);      
            //Result binding
            const objres=new mainResult(bmi,cat_risk[0],cat_risk[1],element.WeightKg,element.HeightCm/100,element.Gender)                
            result.push(objres);
            (bmi>=25 && bmi<=29.9) ? owcount += 1: owcount;
        });
        result.push({total_number_of_overweight_people:owcount})
        res.status(200).json({
            level: "success",
            Message:"successfully calculate BMI",
            Data: result 
        });
    } catch (error) {
        res.status(500).json({
            level:"error",
            Message:"Something went wrong",
            Data:"" 
        });
    }
    
}
class mainResult{
    constructor(BMI,BMI_Category,Health_risk,WeightKg,HeightM,Gender){
        this.BMI=BMI,
        this.BMI_Category=BMI_Category,
        this.Health_risk=Health_risk,
        this.WeightKg=WeightKg,
        this.HeightM=HeightM,
        this.Gender=Gender

    }
}
function findCat_Health(bmi) {
    let cat;
    let hrisk;
    if(bmi<=18.4){
        cat= "Underweight";
        hrisk= "Malnutrition risk";
    }
    else if(bmi>=18.5 && bmi<=24.9){
        cat= "Normal weight";
        hrisk= "Low risk";
    } 
    else if(bmi>=25 && bmi<=29.9){
        cat= "Overweight";
        hrisk= "Enhanced risk";
    }
    else if(bmi>=30 && bmi<=34.9){
        cat= "Moderately obese";
        hrisk= "Medium risk";
    }
    else if(bmi>=35 && bmi<=39.9){
        cat= "Severely obese";
        hrisk= "High risk";
    }
    else {
        cat= "Very  severely obese";
        hrisk= "Very high risk";
    } 
    return [cat,hrisk]    
}

