class WelcomeEmailJob < ActiveJob::Base
  queue_as :default

  # Adds email to a queue to be delivered
  def perform(user)
    UserMailer.welcome_email(user).deliver
  end

end