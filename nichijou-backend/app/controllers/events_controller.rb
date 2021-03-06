class EventsController < ApplicationController
    def index
        events = Event.all
        render json: events
    end

    def create
        event = Event.new(title: params[:title], notes: params[:notes], datetime_of: params[:datetime_of], user_id: params[:user_id])
        event.save
        render json: event
    end

    def destroy
        event = Event.find(params[:id])
        event.destroy
        render json: {message: "Event Deleted"}
    end

end
