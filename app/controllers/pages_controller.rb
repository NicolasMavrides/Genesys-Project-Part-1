class PagesController < ApplicationController

  skip_authorization_check

  def home
    @current_nav_identifier = :home
  end

  def about
    @current_nav_identifier = :about
  end

  def quiz
    @current_nav_identifier = :quiz
  end

  def question
    @current_nav_identifier = :quiz
  end

end