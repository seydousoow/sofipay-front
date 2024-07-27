import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { TFileExtension } from '@sofipay/models';
import { ButtonComponent, IconComponent } from '@sofipay/atoms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'horizon-file-upload',
  standalone: true,
  imports: [IconComponent, DragDropModule, ButtonComponent],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FileUploadComponent), multi: true }],
})
export class FileUploadComponent implements OnInit {
  @Input({ required: true }) id!: string;
  @Input() name?: string;
  @Input() label = 'document.import.dragAndDrop';
  @Input() acceptedFormat: TFileExtension[] = ['*'];
  @Input() multipleFile = false;
  @Input() maxFileSizeInMB = 20;
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() passiveControl = false;

  @Input() checkImageRatio = false;
  @Input() tolerance = 0;
  @Input() prefWidth = 0;
  @Input() prefHeight = 0;

  @Input() value: File[] | null = null;

  @Output() uploaded = new EventEmitter<File[]>();
  @Output() errorEmitter = new EventEmitter<string>();

  fileNames: string[] = [];

  constructor() {
  }

  get maxFileSize(): string {
    const bytes = this.maxFileSizeInMB * 1024 * 1024;
    if (bytes < 1024) {
      return bytes + ' B';
    } else if (bytes < 1024 * 1024) {
      return Math.floor(bytes / 1024) + ' KB';
    } else {
      return Math.floor(bytes / (1024 * 1024)) + ' MB';
    }
  }

  get fileFormat(): string {
    return this.acceptedFormat.join(', ');
  }

  ngOnInit(): void {
    if (!this.name) {
      this.name = this.id;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-explicit-any
  onChange: any = () => {
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-explicit-any
  onTouched: any = () => {
  };

  resetValue(): void {
    this.value = [];
    this.onChange(this.value);
  }

  writeValue(value: File[]): void {
    this.value = this.multipleFile ? value : [value[0]];
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFileSelected(event: any): void {
    const fileList: FileList | null = (event.target as HTMLInputElement).files;
    if (fileList === null) this.resetValue();
    else this.handleFiles(fileList).finally();
  }

  onFileDropped(evt: DragEvent): void {
    this.onDragOver(evt);
    if (this.disabled) return;
    const fileList: FileList | undefined = evt.dataTransfer?.files;
    if (fileList === undefined) this.resetValue();
    else this.handleFiles(fileList).finally();
  }

  onDragOver(evt: DragEvent): void {
    evt.preventDefault();
    evt.stopPropagation();
  }

  private async handleFiles(fileList: FileList): Promise<void> {
    const files: File[] = [];
    let i = 0;
    while (i < fileList.length) {
      const file = fileList[i++];
      if (file.type === '' || file.size === 0) continue;
      files.push(file);
    }
    const errorMsg: string | undefined = await this.checkFilesValidity(files);

    if (errorMsg) {
      if (!this.passiveControl) {
        this.value = [];
      } else {
        this.value = this.multipleFile ? files : [files[0]];
      }
      this.errorEmitter.emit(errorMsg);
    } else this.value = this.multipleFile ? files : [files[0]];
    this.fileNames = this.value.filter(s => s !== undefined).map(s => s.name);
    this.uploaded.emit(this.value);
    this.onChange(this.value);
  }

  private async checkFilesValidity(files: File[]): Promise<string | undefined> {
    if (files.length === 0)
      return "Le format de votre fichier est invalide. Pour rappel, vous devez importer un document à la fois.";
    if (this.isExtensionNotValid(files))
      return "Extension du fichier non valide. Les extensions autorisées sont : " + this.fileFormat;
    if (this.isSizeTooBig(files))
      return "Fichier trop volumineux : max. " + this.maxFileSize;
    return undefined;
  }

  private isExtensionNotValid(files: File[]): boolean {
    if (this.acceptedFormat.includes('*')) return false;
    return files.map((file: File): TFileExtension => '.' + file.name.split('.').pop()?.toLowerCase() as TFileExtension)
      .some(extension => !this.acceptedFormat.includes(extension));
  }

  private isSizeTooBig(files: File[]): boolean {
    const size = this.maxFileSizeInMB * 1024 * 1024;
    return files.map(s => s.size).some(s => s > size);
  }

}
