import { bookingModel } from "@/models/booking-model";
import { hotelModel } from "@/models/hotel-model";
import { ratingModel } from "@/models/rating-model";
import { reviewModel } from "@/models/review-model";
import { uesrModel } from "@/models/user-model";
import { isDateInBetween, replaceMongoIdInArray, replaceMongoIdInObject } from "@/utils/data-util";


export async function getAllHotels(destination, checkin, checkout, category){
    const regex = new RegExp(destination, "i")
    const hotelsByDestination = await hotelModel.find({
        city:{$regex: regex}
    }).select([
        "thumbNailUrl", "name", "highRate", "lowRate", "city", "propertyCategory"
    ]).lean()

    let allHotels = hotelsByDestination;

    if(category){
        const categoriesMatch = category.split("|")
        allHotels = allHotels.filter((item)=>{

            return categoriesMatch.includes(item.propertyCategory.toString())
    })
    }

   


    if(checkin && checkout){
        allHotels = await Promise.all(
            allHotels.map( async(hotel)=>{
                
                const found = await findBooking(hotel._id, checkin, checkout)
                
                if(found){
                    hotel["isBooked"] = true
                }else{
                    hotel["isBooked"] = false
                }
                return hotel
            })
        )
    }
    return replaceMongoIdInArray(allHotels)
}


async function findBooking(hotelId, checkin, checkout){
    const matches = await bookingModel
    .find({hotelId: hotelId.toString()})
    .lean()
    

    const found = matches.find((match)=>{
        return (
            isDateInBetween(checkin, match.checkin, match.checkout) || 
            isDateInBetween(checkout, match.checkin, match.checkout)
        )
    })
    
    return found
}

export async function getHotelById(hotelId, checkin, checkout){
    const hotel = await hotelModel.findById(hotelId).lean()
    if(checkin && checkout){
        const found = await findBooking(hotel._id, checkin, checkout)
        if(found){
            hotel["isBooked"] = true
        }else{
            hotel["isBooked"] = false
        }
    }

    return replaceMongoIdInObject(hotel)
}

export async function getRatingForHotel(hotelId){
    const rating = await ratingModel.find({hotelId: hotelId}).lean()
    return replaceMongoIdInArray(rating)
}

export async function getReviewForHotel(hotelId){
    const review = await reviewModel.find({hotelId: hotelId}).lean()
    return replaceMongoIdInArray(review)
}

export async function getUserByEmail(email){
    const users = await uesrModel.find({email: email}).lean()
    return replaceMongoIdInObject(users[0])
}

export async function getBookingsByUser(userId){
    const bookings = await bookingModel.find({userId: userId}).lean()
    return replaceMongoIdInArray(bookings)
}