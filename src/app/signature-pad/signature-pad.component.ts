import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-signature-pad',
  templateUrl: './signature-pad.component.html',
  styleUrls: ['./signature-pad.component.css']
})
export class SignaturePadComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  private signaturePad!: SignaturePad;
  brushSize: number = 2;  // Default brush size
  brushColor: string = '#000000';  // Default brush color
  showDialog: boolean = false;  // State for showing the download options dialog

  ngAfterViewInit(): void {
    const canvasElement = this.canvas.nativeElement;
    const context = canvasElement.getContext('2d');
  
    // Set the background color to white
    if (context) {
      context.fillStyle = '#ffffff'; // white color
      context.fillRect(0, 0, canvasElement.width, canvasElement.height);
    }
  
    // Initialize signature pad
    this.signaturePad = new SignaturePad(canvasElement);
    this.updateBrushSize();  // Initialize brush size
    this.updateBrushColor();  // Initialize brush color
  }
  

  updateBrushSize(): void {
    this.signaturePad.minWidth = this.brushSize;
    this.signaturePad.maxWidth = this.brushSize;
  }

  updateBrushColor(): void {
    this.signaturePad.penColor = this.brushColor;
  }

  clear(): void {
    this.signaturePad.clear();
  }

  showDownloadOptions(): void {
    this.showDialog = true;
  }

  closeDialog(): void {
    this.showDialog = false;
  }

  download(option: string): void {
    if (this.signaturePad.isEmpty()) {
      alert('Please provide a signature first.');
      return;
    }
  
    const canvasElement = this.canvas.nativeElement;
    const context = canvasElement.getContext('2d');
  
    // Set the background color to white (moved here)
    if (context) {
      context.fillStyle = '#ffffff'; // Set background color to white
      context.fillRect(0, 0, canvasElement.width, canvasElement.height);
    }
  
    // Redraw the signature strokes
    this.signaturePad.fromData(this.signaturePad.toData());
  
    if (option === 'without-bg') {
      // ... (existing logic for download without background)
    } else {
      // Download with background (existing logic remains)
      const dataURL = canvasElement.toDataURL('image/png');
      this.downloadImage(dataURL, 'signature.png');
    }
  
    this.closeDialog();
  }  

  downloadImage(dataURL: string, filename: string): void {
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = filename;
    link.click();
  }
}
