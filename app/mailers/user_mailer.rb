class UserMailer < ActionMailer::Base
  default from: 'Securium <no-reply@sheffield.ac.uk>'
  default reply_to: 'team02genesys@gmail.com'

  def welcome_email(user)
    @user = user
    mail(to: @user.email,
         subject: "[Signed up] Welcome to Securium Mailing list!")
  end

end
