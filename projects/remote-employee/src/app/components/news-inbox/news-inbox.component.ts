import { Component } from '@angular/core';
import { LucideAngularModule } from "lucide-angular";

@Component({
  selector: 'app-news-inbox',
  imports: [LucideAngularModule],
  templateUrl: './news-inbox.component.html',
})
export class NewsInboxComponent {
  titles = [
    { id: 1, name: 'Changes in your work environment', sender: 'Rachel, Marieke, Tim', lastupdated: '27/10/2025 - 12:00' },
    { id: 2, name: 'Thank you for filling in the monthly survey!', sender: 'Tim', lastupdated: '01/11/2025 - 14:00' },
    { id: 3, name: 'Reminder to fill in the monthly survey', sender: 'Marieke', lastupdated: '01/09/2025 - 12:00' },
    { id: 4, name: 'Achievements in Samen aan Z so far', sender: 'Rachel, Marieke, Tim', lastupdated: '20/08/2025 - 12:00' },
    { id: 5, name: 'Introducing a new colleague!', sender: 'Rachel', lastupdated: '01/07/2025 - 12:00' },
    { id: 6, name: 'Results from the weekly survey', sender: 'Rachel, Marieke, Tim', lastupdated: '01/06/2025 - 12:00' }
  ];
}
