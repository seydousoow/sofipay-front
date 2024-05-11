import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileUploadComponent } from './file-upload.component';
import { SvgIconRegistryService, SvgLoader } from 'angular-svg-icon';

const mockFile: File = new File([], 'test.txt');
const mockFile2: File = new File([], 'test2.png');

describe('File Upload component', () => {
  let fixture: ComponentFixture<FileUploadComponent>;
  let component: FileUploadComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileUploadComponent],
      providers: [SvgIconRegistryService, SvgLoader],
    }).compileComponents();

    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    component.id = 'upload';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.ngOnInit();
    expect(component.name).toEqual('upload');
  });

  it('should return a comma joined extension', () => {
    component.acceptedFormat = ['.pdf', '.jpeg', '.png'];
    expect(component.fileFormat).toEqual('.pdf, .jpeg, .png');
  });

  it('should reset the value', () => {
    component.value = [mockFile];
    jest.spyOn(component, 'onChange');
    component.resetValue();
    expect(component.value).toEqual([]);
    expect(component.onChange).toHaveBeenCalled();
  });

  it('should write the value', () => {
    component.value = [];
    component.multipleFile = false;
    component.writeValue([mockFile, mockFile2]);
    expect(component.value).toEqual([mockFile]);

    component.multipleFile = true;
    component.writeValue([mockFile, mockFile2]);
    expect(component.value).toEqual([mockFile, mockFile2]);
  });

  it('should verify if the extension if correct', () => {
    expect(component['isExtensionNotValid']([mockFile, mockFile2])).toBeFalsy();

    component.acceptedFormat = ['.png'];
    expect(component['isExtensionNotValid']([mockFile2])).toBeFalsy();
    expect(component['isExtensionNotValid']([mockFile])).toBeTruthy();
  });

  it('should verify if the extension if correct', () => {
    component.maxFileSizeInMB = 20;
    Object.defineProperty(mockFile, 'size', { value: 1024 * 1024 * 21 });
    expect(component['isSizeTooBig']([mockFile, mockFile2])).toBeTruthy();

    component.maxFileSizeInMB = 30;
    expect(component['isSizeTooBig']([mockFile, mockFile2])).toBeFalsy();
  });

  it('should reset the value when uploading no file', () => {
    jest.spyOn(component, 'resetValue');
    component.onFileSelected({ target: { files: null } });

    expect(component.resetValue).toHaveBeenCalled();
  });

  it('should handle file upload with valid files', () => {
    const eventMock = { target: { files: [mockFile, mockFile2] } };
    jest.spyOn<FileUploadComponent, any>(component, 'checkFilesValidity').mockReturnValue(undefined);
    jest.spyOn(component, 'onChange');

    component.onFileSelected(eventMock);

    expect(component['checkFilesValidity']).toHaveBeenCalled();
  });

  it('should handle file upload with invalid files', () => {
    const eventMock = { target: { files: [mockFile, mockFile2] } };
    const errorMsg = 'Invalid file';
    jest.spyOn<FileUploadComponent, any>(component, 'checkFilesValidity').mockReturnValue(errorMsg);
    jest.spyOn(component, 'onChange');
    jest.spyOn(component.errorEmitter, 'emit');

    component.onFileSelected(eventMock);

    expect(component['checkFilesValidity']).toHaveBeenCalled();
    expect(component.errorEmitter.emit).not.toHaveBeenCalled();
  });

  it('should reset value on file dropped', () => {
    jest.spyOn(component, 'resetValue');
    jest.spyOn(component, 'onDragOver');
    const evt: Partial<DragEvent> = {
      dataTransfer: null,
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    };
    component.onFileDropped(evt as DragEvent);
    expect(component.resetValue).toHaveBeenCalled();
    expect(component.onDragOver).toHaveBeenCalledWith(evt);
  });

  it('should set the value on file dropped', () => {
    jest.spyOn<FileUploadComponent, any>(component, 'handleFiles');
    jest.spyOn(component, 'onDragOver');
    const evt: Partial<DragEvent> = {
      dataTransfer: null,
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    };
    component.onFileDropped(evt as DragEvent);
    expect(component['handleFiles']).not.toHaveBeenCalled();
    expect(component.onDragOver).toHaveBeenCalledWith(evt);
  });

});
