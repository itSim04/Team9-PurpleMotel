import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowseServicesComponent } from './browse-services.component';


describe('ServicesComponent', () => {
  let component: BrowseServicesComponent;
  let fixture: ComponentFixture<BrowseServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowseServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
