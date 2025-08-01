from django.urls import path
from .views import UserDetail, CustomLoginView, VerifyTokenView,ExamPaperListView,RunCodeView,SubmitExamView

urlpatterns = [
    path('login/', CustomLoginView.as_view(), name='custom_login'),
    path('verify-token/', VerifyTokenView.as_view(), name='verify_token'),
    path('user/<int:pk>/', UserDetail.as_view(), name='user_detail'),
    path('exam-papers/', ExamPaperListView.as_view(), name='exam_paper_list'),
    path('run-code/', RunCodeView.as_view(), name='run_code'),
    path('submit-exam/', SubmitExamView.as_view(), name='submit_exam'),
]
