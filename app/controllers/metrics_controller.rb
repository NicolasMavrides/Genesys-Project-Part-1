class MetricsController < ApplicationController

  def store_metric
    permitted_params = params.permit(:score, :plan)
    current_visit.update(permitted_params)
    head 200 # replacement for 'render nothing: true'
  end

end