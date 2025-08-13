from django.urls import path
from .views import( ExamResultListView, UserDetail, CustomLoginView, VerifyTokenView,ExamPaperListView,RunCodeView,SubmitExamView,AttendanceView,
                StudentDashboardSummaryView,StudentResultsView,NotesView,NoteDownloadView,SubjectListView,
                ExamPaperCreateView, BranchListView,StudentByBranchView,MarkAttendanceView )

urlpatterns = [
    path('login/', CustomLoginView.as_view(), name='custom_login'),
    path('verify-token/', VerifyTokenView.as_view(), name='verify_token'),
    path('user/<int:pk>/', UserDetail.as_view(), name='user_detail'),
    path('exam-papers/', ExamPaperListView.as_view(), name='exam_paper_list'),
    path('run-code/', RunCodeView.as_view(), name='run_code'),
    path('submit-exam/', SubmitExamView.as_view(), name='submit_exam'),
    path('exam-results/', ExamResultListView.as_view(), name='exam_result_list'),
    path('attendance/', AttendanceView.as_view(), name='attendance_list'),
    path('student-dashboard-summary/<int:enrollment_no>/', StudentDashboardSummaryView.as_view(), name='student_dashboard_summary'),
    path('student-results/', StudentResultsView.as_view(), name='student_results'),
    path('notes/', NotesView.as_view(), name='notes_list_upload'),
    path('notes/<int:pk>/download/', NoteDownloadView.as_view(), name='note_download'),
    path('subjects/', SubjectListView.as_view(), name='subject-list'),
    path('create-exam/', ExamPaperCreateView.as_view(), name='create-exam'),
    path('students-by-branch/<str:branch>/', StudentByBranchView.as_view(), name='students-by-branch'),
    path('mark-attendance/', MarkAttendanceView.as_view(), name='mark-attendance'),
    path('branches/', BranchListView.as_view(), name='branch-list'),
]
