import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FbcPesquisaComponent } from './fbc-pesquisa.component';

describe('FbcPesquisaComponent', () => {
  let component: FbcPesquisaComponent;
  let fixture: ComponentFixture<FbcPesquisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FbcPesquisaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FbcPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
