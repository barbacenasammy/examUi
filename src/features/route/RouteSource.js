import { nanoid } from 'nanoid'
import Index from '../admin/Index'
import PaperForm from '../paper/PaperForm'
import Subject from '../view/subject'
import Result from '../view/result'
import Student from '../view/student'
import CreateExam from '../view/exam/create/CreateExam'
import Exam from '../view/exam'
import {
     MenuBook,
     Assignment,
     AccountBox,
     BorderColor,
     Settings,
     InsertDriveFile
} from '@material-ui/icons';
import ExamMaintenance from '../view/exam/maintenance/ExamMaintenance'

export default {
     RouteSource: [
          {
               id: nanoid(),
               path: '/login',
               name: 'Login',
               component: <Index />,
               route: 'public'
          },
          {
               id: nanoid(),
               path: '/subject',
               name: 'Subject',
               route: 'private',
               icon: <MenuBook />,
               component: <Subject />
          },
          // {
          //      id: nanoid(),
          //      divider: true,
          // },
          {
               id: nanoid(),
               path: '/student',
               name: 'Student',
               route: 'private',
               icon: <AccountBox />,
               component: <Student />
          },
          {
               id: nanoid(),
               path: '/client',
               name: 'Client',
               component: <PaperForm />,
               route: 'public'
          },
          {
               id: nanoid(),
               path: '/mainExam',
               name: 'Exam',
               route: 'private',
               dropdown: true,
               subMenus: [
                    {
                         id: nanoid(),
                         path: '/exam/create',
                         name: 'Create',
                         icon: <InsertDriveFile />,
                         component: <CreateExam />
                    },
                    {
                         id: nanoid(),
                         path: '/exam/maintain',
                         name: 'Maintenance',
                         icon: <Settings />,
                         component: <ExamMaintenance />
                    },
                    {
                         id: nanoid(),
                         path: '/result',
                         name: 'Result',
                         icon: <Assignment />,
                         component: <Result />
                    },
               ],
               icon: <BorderColor />,
               component: <Index />
          }

     ]
}
