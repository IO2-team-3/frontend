import { bussiness_meeting, concert, event, student, stadium, orchestra, tickets, facebook, instagram, linkedin, twitter} from "../assets";

import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { faIdCard } from '@fortawesome/free-solid-svg-icons'
import { faForward } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";

export const appName = "EventWave";

export const navLinks = [
  {
    id: "home",
    title: "Home",
    icon: "fa fa-home",
    link: "/",
  },
  {
    id: "log_in",
    title: "Log in",
    icon: "fa fa-solid fa-user",
    link: "/log_in",
  },
];

export const authNavLinks = [
  {
    id: "my_events",
    title: "My events",
    icon: "fa fa-book",
    link: "/organizer/my_events",
  },
  {
    id: "profile",
    title: "Profile",
    icon: "fa fa-solid fa-user",
    link: "/organizer/profile",
  },
  {
    id: "log_out",
    title: "Log out",
    icon: "fa fa-arrow-right",
    link: "/",
  },
];

export const api = {
    base: "http://localhost:5000"
}

export const slides = [
  {
    id: "1",
    photo: event,
    text: "Organize an event and show it to the world!",
  },
  {
    id: "2",
    photo: concert,
    text: "Join the organizers of the best music shows.",
  },
  {
    id: "3",
    photo: student,
    text: "Gain an audience for your scientific event.",
  },
  {
    id: "4",
    photo: bussiness_meeting,
    text: "Simplify reservation system for business meeting.",
  },
  {
    id: "5",
    photo: stadium,
    text: "Let fans join your event and feel sporting excitement.",
  },
  {
    id: "6",
    photo: orchestra,
    text: "All best cultural events in one place.",
  },
  {
    id: "7",
    photo: tickets,
    text: "Easy and safe reservation system.",
  },
]

export const mainPageAnimationText = [
  {
    id: "first-period",
    text: "Start your adventure",
  },
  {
    id: "second-period",
    text: "with organizing events.",
  }
]

export const statistics = [
  {
    id: "statistics-1",
    title: "Users",
    value: "100k+",
    icon: faUsers,
    bounce: false,
    fade: true,
    beat: false,
  },
  {
    id: "statistics-2",
    title: "Organisators",
    value: "10k+",
    icon: faBriefcase,
    bounce: true,
    fade: false,
    beat: false,
  },
  {
    id: "statistics-3",
    title: "Reservations",
    value: "1M+",
    icon: faIdCard,
    bounce: false,
    fade: false,
    beat: true,
  },
];

export const footerLinks = [
  {
    title: "Useful Links",
    links: [
      {
        name: "How it Works",
        link: "/",
      },
      {
        name: "Create event",
        link: "/my_events",
      },
      {
        name: "My events",
        link: "/my_events",
      },
      {
        name: "Terms & Services",
        link: "/",
      },
    ],
  },
  {
    title: "Community",
    links: [
      {
        name: "Help Center",
        link: "/",
      },
      {
        name: "Partners",
        link: "/",
      },
      {
        name: "Newsletters",
        link: "/",
      },
    ],
  },
];

export const socialMedia = [
  {
    id: "social-media-1",
    icon: instagram,
    link: "https://www.instagram.com/",
  },
  {
    id: "social-media-2",
    icon: facebook,
    link: "https://www.facebook.com/",
  },
  {
    id: "social-media-3",
    icon: twitter,
    link: "https://www.twitter.com/",
  },
  {
    id: "social-media-4",
    icon: linkedin,
    link: "https://www.linkedin.com/",
  },
];

export const inFutureIcon = faForward
export const pendingIcon = faCircle
export const doneIcon = faCircleCheck
export const cancelledIcon = faRectangleXmark

export const geoCoordinatesValues = [
  {
    id: "latitude",
    name: "Latitude",
    min: -90, 
    max: 90 
  },
  {
    id: "longitude",
    name: "Longitude",
    min: -180, 
    max: 180 
  }
]
