class RegistrationsController < ApplicationController

  def new
    @registration = Registration.new
      @current_nav_identifier = :quiz
  end

  def create
    @registration = Registration.new
    if @registration.update(registration_params)
      WelcomeEmailJob.set(wait: 20.seconds).perform_later(@registration)
      current_visit.update(registration: @registration)
      session[:current_visit_id] = nil
      redirect_to :root
    else
      render :new
    end
  end

  private
    def registration_params
      params.require(:registration).permit(:email)
    end

end
